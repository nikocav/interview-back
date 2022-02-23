import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../service/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: '2322',
              name: 'Andres',
              lastName: 'lastName',
              email: 'email',
              phone: 'phone'
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual([
        {
          id: '2322',
          name: 'Andres',
          lastName: 'lastName',
          email: 'email',
          phone: 'phone'
        },
      ]);
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });
  });
});
