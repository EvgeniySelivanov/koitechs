function Card({ header, main, footer  }) {
  return (
    <div className="layout">
    <header>{header}</header>
    <main>{main}</main>
    <footer>{footer}</footer>
</div>
  );
}
export default Card;