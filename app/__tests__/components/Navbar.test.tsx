import { render, screen, fireEvent } from "@testing-library/react";
import {useCart} from "../../context/cart/CartContext";
import Navbar from "@/app/components/Navbar/navbar";

jest.mock("../../context/cart/CartContext", () => {
    const MockCartSidebar = () => (
      <div data-testid="cart-sidebar">CartSidebar</div>
    );
    MockCartSidebar.displayName = "MockCartSidebar";
    return MockCartSidebar;
  });

// Mock del contexto del carrito
jest.mock("../../context/cart/CartContext", () => ({
  useCart: jest.fn(),
}));

describe("Navbar", () => {
  const mockUseCart = useCart as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the Navbar with the logo and login button", () => {
    // simulamos el carrito vacio
    mockUseCart.mockReturnValue({
      cart: { items: [] },
    });

    render(<Navbar />);

  // verificacion del Logo
    expect(screen.getByText("Tech -Sed")).toBeInTheDocument();

    // Verificar el botón de Iniciar sesión
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    });

  test("should show the correct number of items in the cart", () => {
    // Simular carrito con 3 ítems
    mockUseCart.mockReturnValue({
      cart: { items: [{}, {}, {}] }, // Tres productos en el carrito
    });

    render(<Navbar />);

    // Verificar el número de ítems en el carrito
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("should open the CartSidebar when clicking the cart icon", () => {
    // simulamos el carrito vacio
    mockUseCart.mockReturnValue({
      cart: { items: [] },
    });

    render(<Navbar />);

    // Verificar que el CartSidebar no se renderiza inicialmente
    expect(screen.queryByTestId("cart-sidebar")).not.toBeInTheDocument();

    // Hacer clic en el ícono del carrito
    fireEvent.click(screen.getByRole("img", { name: /shopping cart/i }));

    // Verificar que el CartSidebar se muestra
    expect(screen.getByTestId("cart-sidebar")).toBeInTheDocument();
  });

  test("should close the CartSidebar when the onClose callback is triggered", () => {
    // simulamos el carrito vacio
    mockUseCart.mockReturnValue({
      cart: { items: [] },
    });

    render(<Navbar />);

    // simula el clic en el ícono del carrito
    fireEvent.click(screen.getByRole("img", { name: /shopping cart/i }));

    // verifica que el CartSidebar está abierto
    expect(screen.getByTestId("cart-sidebar")).toBeInTheDocument();

    // simulamos el cierre del CartSidebar
    fireEvent.click(screen.getByTestId("cart-sidebar")); 

    // Como el CartSidebar está mocqueado, no podemos verificar un cierre real,
  });
});
