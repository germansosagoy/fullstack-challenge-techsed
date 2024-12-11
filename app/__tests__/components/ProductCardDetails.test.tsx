import { render, screen, fireEvent } from '@testing-library/react';
import ProductCardDetails from '@/app/components/ProductCard/ProductCardDetails';
import { useCart } from '../../context/cart/CartContext';
import { CartContextType } from '@/app/types/cart-types';
import { Product } from '@/app/types/product-types';
import { useRouter } from 'next/router';

// Mockear el hook useCart con la ruta correcta
jest.mock('../../context/cart/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mockear useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProductCardDetails', () => {
  const product: Product = {
    id: '1',
    title: 'Producto de prueba',
    price: 100,
    listingPrice: 150,
    image: 'https://via.placeholder.com/150',
    description: 'Descripción de prueba del producto',
    stock: 10,
    salesUnit: 'unit',
  };

  beforeEach(() => {
    // Resetea los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test('should display "Agregar" button when product is not in the cart', () => {
    const mockCartContext: CartContextType = {
      cart: {
        items: [],
        quantity: 0,
        id: '',
        createdAt: new Date(),
      },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    };

    (useCart as jest.Mock).mockReturnValue(mockCartContext);

    // Mock del enrutador
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });

    render(<ProductCardDetails product={product} />);

    // Verificar que el botón "Agregar" esté presente
    expect(screen.getByText('Agregar')).toBeInTheDocument();
    expect(screen.queryByText('Eliminar del carrito')).toBeNull(); // Eliminar no debe aparecer
  });

  test('should call addToCart when "Agregar" button is clicked', () => {
    const addToCartMock = jest.fn();

    const mockCartContext: CartContextType = {
      cart: {
        items: [],
        quantity: 0,
        id: '',
        createdAt: new Date(),
      },
      addToCart: addToCartMock,
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    };

    (useCart as jest.Mock).mockReturnValue(mockCartContext);

    // Mock del enrutador
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
    });

    render(<ProductCardDetails product={product} />);

    const addButton = screen.getByText('Agregar');
    fireEvent.click(addButton);

    // Verificar que la función addToCart haya sido llamada con el producto y cantidad 1
    expect(addToCartMock).toHaveBeenCalledWith(product, 1);
  });

  // Agrega el resto de las pruebas siguiendo el mismo patrón
});
