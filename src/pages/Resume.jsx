import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart } from '@mui/x-charts/PieChart';
import {
  Stack,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Avatar,
  TableRow,
  Paper,
  Link,
} from '@mui/material';
const Resume = () => {
  const { user, userNotFound, languages,sortedRepos } = useSelector((state) => state.user);
  const dataForDiagram = languages.map((item, index) => ({
    id: index,
    value: parseFloat(item.percentage.replace(',', '.')),
    label: item.language,
  }));

  const formattedDate = new Date(user.created_at).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
  return (
    <>
      {userNotFound === false ? (
        <Stack
          sx={{
            width: 'calc(100% - 40px)',
            maxWidth: '600px',
            margin: 'auto',
            gap: '20px',
            padding: '20px',
            justifyContent: 'flex-start',
          }}
        >
          <Box component="h1">Resume</Box>
          <Avatar
            alt={'avatar'}
            src={user.avatar_url}
            sx={{ width: 100, height: 100 }}
          />
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell>User name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profile created</TableCell>
                  <TableCell>{formattedDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Public repos</TableCell>
                  <TableCell>{user.public_repos}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>{user.type}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell>{user.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Profile link</TableCell>
                  <TableCell>
                    <Link
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {user.html_url}
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <PieChart
            series={[
              {
                data: dataForDiagram,
              },
            ]}
            height={300}
            margin={{ top: 100}}
            sx={{ width: 'calc(100% - 40px)', maxWidth: '600px'}}
            legend={{
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
            }}
          />
           <Box component='p'>User Repositories</Box>
             <TableContainer component={Paper}>
             
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRepos.map((repo) => (
            <TableRow key={repo.id}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{new Date(repo.updated_at).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.html_url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Stack>
      ) : (
        <Box
          sx={{
            width: 'calc(100% - 40px)',
            maxWidth: '600px',
            margin: 'auto',
            fontSize: '80px',
          }}
        >
          User not found
        </Box>
      )}
    </>
  );
};

export default Resume;
