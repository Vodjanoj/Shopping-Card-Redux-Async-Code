import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
  const availableProducts = [
    {
      id: "p1",
      title: "Cheese",
      price: 6,
      description: "This is a first product - amazing!",
    },
    {
      id: "p2",
      title: "Bread",
      price: 8,
      description: "This is a second product - amazing!",
    },
  ];

  const productsList = availableProducts.map((product) => (
    <ProductItem
      id={product.id}
      key={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productsList}</ul>
    </section>
  );
};

export default Products;
