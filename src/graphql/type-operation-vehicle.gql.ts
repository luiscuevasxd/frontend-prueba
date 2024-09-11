import { gql } from '@apollo/client';

export const GET_TYPE_OPERATION_VEHICLES = gql`
  query {
    getTypeOperationVehicles {
      id
      name
      code
      description
      status
      createdAt
    }
  }
`;
