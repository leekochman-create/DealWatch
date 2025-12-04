export function ResultTable({ results }) {
  return (
    <table className="w-full mt-6 border-collapse">
      <thead>
        <tr>
          <th>Store</th>
          <th>Base Price</th>
          <th>Shipping</th>
          <th>VAT</th>
          <th>Final</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {results.map((item, i) => (
          <tr key={i}>
            <td>{item.store}</td>
            <td>${item.price.toFixed(2)}</td>
            <td>${item.shipping.toFixed(2)}</td>
            <td>${item.vatAmount.toFixed(2)} ({item.vatRate * 100}%)</td>
            <td><b>${item.final.toFixed(2)}</b></td>
            <td><a href={item.link} target="_blank">Buy</a></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
