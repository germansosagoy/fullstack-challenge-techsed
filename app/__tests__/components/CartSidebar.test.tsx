import { render, screen, fireEvent } from "@testing-library/react";
import CartSidebar from "@/app/components/Cart/CartSidebar";
import {useCart} from "../../context/cart/CartContext";
import { CartContextType } from "@/app/types/cart-types";

// mockear el hook useCart
jest.mock("../../context/cart/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("CartSidebar", () => {
  const mockCartContext: CartContextType = {
    cart: {
      items: [
        {
          product: {
            id: "1",
            title: "Producto de prueba",
            price: 100,
            image: "/test-image.jpg",
            description: "Descripción de prueba",
            stock: 10,
            salesUnit: "unit",
          },
          quantity: 2,
        },
      ],
      quantity: 1,
      id: "cart-1",
      createdAt: new Date(),
    },
    addToCart: jest.fn(),
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
  };

  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue(mockCartContext);
  });

  test("should render the cart sidebar with product information", () => {
    // const total = 100 * 2;
    render(<CartSidebar isOpen={true} onClose={onClose} />);

    expect(screen.getByText("Producto de prueba")).toBeInTheDocument();
    expect(screen.getByText("Quitar")).toBeInTheDocument();

    // formatPrice para calcular el valor esperado
    expect(screen.getByText((content) => content.includes("$ 200,00"))).toBeInTheDocument();


  });

  test("should call onClose when overlay is clicked", () => {
    render(<CartSidebar isOpen={true} onClose={onClose} />);

    // simula el clic en el overlay
    fireEvent.click(screen.getByRole("button", { name: /continuar comprando/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("should display 'El carrito está vacío' when no items are in the cart", () => {
    // simula un carrito vacio
    (useCart as jest.Mock).mockReturnValue({
      ...mockCartContext,
      cart: { ...mockCartContext.cart, items: [] },
    });

    render(<CartSidebar isOpen={true} onClose={onClose} />);

    expect(screen.getByText("El carrito está vacío.")).toBeInTheDocument();
  });
});
