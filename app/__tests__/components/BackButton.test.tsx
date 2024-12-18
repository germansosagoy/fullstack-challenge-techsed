import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import BackButton from "../../components/ui/back-button";


jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  const mockBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
  });

  test("should render BackButton with label and icon", () => {
    render(<BackButton label="Volver" />);

    // verifica que el texto "Volver" esté presente
    expect(screen.getByText("Volver")).toBeInTheDocument();

    // verifica que el icono se renderiza buscando su clase
    const icon = document.querySelector(".w-4.h-4");
    expect(icon).toBeInTheDocument();
  });

  test("should call router.back when clicked", () => {
    render(<BackButton label="Volver" />);

    // simular clic en el botón
    fireEvent.click(screen.getByText("Volver"));

    // verificar que router.back() se llame
    expect(mockBack).toHaveBeenCalled();
  });

  test("should call router.back when the button without label is clicked", () => {
    render(<BackButton />);

    fireEvent.click(screen.getByRole("button"));

    expect(mockBack).toHaveBeenCalled();
  });
});
