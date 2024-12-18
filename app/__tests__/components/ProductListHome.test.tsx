import { render, screen } from '@testing-library/react';
import ProductListHome from '../../components/Product/ProductListHome/ProductListHome';
import { Product } from '@/app/types/product-types';

const mockProducts: Product[] = [
  { id: '1', title: 'Product 1', price: 100, listingPrice: 120, image: '', description: '', stock: 5, salesUnit: 'unit' },
  { id: '2', title: 'Product 2', price: 200, listingPrice: 220, image: '', description: '', stock: 3, salesUnit: 'group' },
];


jest.mock('../../components/ProductCard/ProductCardHome', () => {
  return function MockProductCardHome({ product }: { product: Product }) {
    return <div data-testid="product-card-home">{product.title}</div>;
  };
});

describe('ProductListHome', () => {
  test('renders the correct number of ProductCardHome components', () => {
    render(<ProductListHome products={mockProducts} />);

    // verificar que se renderice el titulo con la cantidad correcta
    expect(screen.getByText(`Productos Destacados (${mockProducts.length})`)).toBeInTheDocument();

    // verifica que se rendericen los productos correctos
    mockProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });

    // verifica la cantidad de ProductCardHome renderizados
    expect(screen.getAllByTestId('product-card-home')).toHaveLength(mockProducts.length);
  });

  test('renders correctly with an empty product list', () => {
    render(<ProductListHome products={[]} />);

    expect(screen.getByText('Productos Destacados (0)')).toBeInTheDocument();

    expect(screen.queryAllByTestId('product-card-home')).toHaveLength(0);
  });
});
