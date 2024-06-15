import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { Container, Flex, Pill } from "@mantine/core";
import classes from "./Product.module.css";

const useAppSelector = useSelector.withTypes<RootState>();

const Divider = () => <div className={classes.divider}></div>;

const Product = () => {
  const product = useAppSelector((state) => state.product);

  return (
    <Container m={"lg"}>
      <Flex justify={"center"} direction={"column"} align={"center"}>
        <img src={product.image} alt="product-image" width="150px" />
        <h3>{product.title}</h3>
        <span className={classes.subtitle}>{product.subtitle}</span>
        <Divider />
        <Flex wrap={"wrap"}>
          {product.tags.map((tag, index) => (
            <Pill size="md" m="xs" key={index}>
              {tag}
            </Pill>
          ))}
        </Flex>
        <Divider />
      </Flex>
    </Container>
  );
};

export default Product;
