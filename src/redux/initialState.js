export const initialState = {
  products: {
    data: [
      {
        _id: 1,
        name: 'Canon',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non maximus tellus. Phasellus condimentum ut.',
        sale: true,
        price: 1200,
        oldPrice: 1399,
        inStock: 4,
        src: 'canon.jpg',
      },
      {
        _id: 2,
        name: 'Nikon',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eu ipsum eu sapien ultricies placerat.',
        sale: false,
        price: 1420,
        oldPrice: '',
        inStock: 7,
        src: 'nikon.jpg',
      },
      {
        _id: 3,
        name: 'Sony',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra consequat lobortis. Etiam vitae.',
        sale: true,
        price: 1399,
        oldPrice: 1549,
        inStock: 7,
        src: 'sony.jpg',
      },
      {
        _id: 4,
        name: 'Olympus',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur.',
        sale: false,
        price: 699,
        oldPrice: '',
        inStock: 7,
        src: 'olympus.jpg',
      },
      {
        _id: 5,
        name: 'Travel kit',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porta felis ut lobortis molestie. Suspendisse potenti. Nunc tempor congue.',
        sale: true,
        price: 4420,
        oldPrice: 5999,
        inStock: 7,
        src: 'travel-kit.jpg',
      },
      {
        _id: 6,
        name: 'Nikkor lens',
        description: 'Orci varius natoque penatibus et magnis.',
        sale: false,
        price: 299,
        oldPrice: '',
        inStock: 7,
        src: 'nikkor-lens.jpg',
      },
    ],

    loading: {
      active: false,
      error: false,
    },
  },
  cart: {},
};
