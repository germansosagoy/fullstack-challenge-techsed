import { render, screen } from '@testing-library/react';
import ProductDetails from "../../components/Product/ProductDetails/ProductDetails";
import { Product } from '../../types/product-types';

const mockProduct: Product = {
  id: '1',
  title: 'Test Product',
  price: 100,
  listingPrice: 150,
  image: 'https://via.placeholder.com/150',
  description: 'Test product description',
  stock: 5,
  salesUnit: 'unit',
};

jest.mock('../../components/ProductCard/ProductCardDetails', () => {
  return function MockProductCardDetails() {
    return <div data-testid="product-card-details">Mock ProductCardDetails</div>;
  };
});

describe('ProductDetails', () => {
  test('renders ProductCardDetails with the correct product', () => {
    render(<ProductDetails product={mockProduct} />);

    // verifica que el mock del ProductCardDetails se muestre
    expect(screen.getByTestId('product-card-details')).toBeInTheDocument();

    expect(screen.getByText('Mock ProductCardDetails')).toBeInTheDocument();
  });
});
