
const errorDictionary = {
    PRODUCT_NOT_FOUND: {
      code: 'PRODUCT_NOT_FOUND',
      message: 'Product not found.',
      status: 404,
    },
    PRODUCT_CREATION_FAILED: {
      code: 'PRODUCT_CREATION_FAILED',
      message: 'Failed to create product.',
      status: 400,
    },
    PRODUCT_UPDATE_FAILED: {
      code: 'PRODUCT_UPDATE_FAILED',
      message: 'Failed to update product.',
      status: 400,
    },
    PRODUCT_DELETION_FAILED: {
      code: 'PRODUCT_DELETION_FAILED',
      message: 'Failed to delete product.',
      status: 400,
    },
    INVALID_OBJECT_ID: {
      code: 'INVALID_OBJECT_ID',
      message: 'Invalid ObjectId.',
      status: 400,
    }
  };
  
  export default errorDictionary;
  