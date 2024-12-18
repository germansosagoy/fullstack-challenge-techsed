import { render, screen, fireEvent } from '@testing-library/react';
import ProductCardHome from '@/app/components/ProductCard/ProductCardHome';
import {useCart} from "../../context/cart/CartContext";
import { CartContextType } from '@/app/types/cart-types';
import { Product } from '@/app/types/product-types';


// mockear el hook "useCart" 
jest.mock('../../context/cart/CartContext', () => ({
    useCart: jest.fn(),
  }));
  
describe('ProductCardHome', () => {
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
    // reiniciar los mocks antes de cada prueba
    jest.clearAllMocks();
  });

  test('should display "Agregar" button when product is not in the cart', () => {
    // Mockear el estado de cart y las funciones
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

    render(<ProductCardHome product={product} />);

    // verifica que el botón "Agregar" esté presente
    expect(screen.getByText('Agregar')).toBeInTheDocument();
    expect(screen.queryByText('Eliminar del carrito')).toBeNull(); 
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

    render(<ProductCardHome product={product} />);

    const addButton = screen.getByText('Agregar');
    fireEvent.click(addButton);

    // veriifica que la función addToCart se llame con el producto y cantidad 1
    expect(addToCartMock).toHaveBeenCalledWith(product, 1);
  });

  test('should display "Eliminar del carrito" button when product is in the cart', () => {
    const mockCartContext: CartContextType = {
      cart: {
        items: [{ product, quantity: 1 }],
        quantity: 0,
        id: '',
        createdAt: new Date(),
      },
      addToCart: jest.fn(),
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
    };
  
    (useCart as jest.Mock).mockReturnValue(mockCartContext);
  
    render(<ProductCardHome product={product} />);

    // verificar que el botón "Eliminar del carrito" esté presente
    expect(screen.getByText('Eliminar del carrito')).toBeInTheDocument();
    expect(screen.queryByText('Agregar')).toBeNull();
  });

  test('should call removeFromCart when "Eliminar del carrito" button is clicked', () => {
    const removeFromCartMock = jest.fn();

    const mockCartContext: CartContextType = {
        cart: {
            id: '',
            items: [{ product, quantity: 1 }],
            quantity: 0,
            createdAt: new Date(),
          },
      addToCart: jest.fn(),
      removeFromCart: removeFromCartMock,
      updateQuantity: jest.fn(),
    };

    (useCart as jest.Mock).mockReturnValue(mockCartContext);

    render(<ProductCardHome product={product} />);

    const removeButton = screen.getByText('Eliminar del carrito');
    fireEvent.click(removeButton);

    // verificar que la función "removeFromCart" sea llamada con el ID del producto
    expect(removeFromCartMock).toHaveBeenCalledWith(product.id);
  });
});
