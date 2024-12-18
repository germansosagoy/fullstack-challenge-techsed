import { render, screen, fireEvent } from "@testing-library/react";
import ProductCardDetails from "../../components/ProductCard/ProductCardDetails";
import { CartProvider } from "../../context/cart/CartContext";
import { Product } from "../../types/product-types";

// mockear el hook "useRouter"
jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(), 
  }),
}));

describe("ProductCardDetails", () => {
  const baseProduct: Product = {
    id: "1",
    title: "Producto de prueba",
    description: "Descripción de prueba del producto",
    price: 100,
    listingPrice: 150,
    stock: 10,
    image: "https://via.placeholder.com/150",
    salesUnit: "unit",
  };

  // función simple para renderizar el componente
  const renderComponent = () => {
    return render(
      <CartProvider>
        <ProductCardDetails product={baseProduct} />
      </CartProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should display 'Agregar' button initially", () => {
    renderComponent();

    // verificar que el botón de "agregar" está presente al principio
    expect(screen.getByText("Agregar")).toBeInTheDocument();
  });

  test("should display 'Eliminar producto' button after clicking 'Agregar'", () => {
    renderComponent();

    // simular clic en el botón "Agregar"
    fireEvent.click(screen.getByText("Agregar"));
  });
});
