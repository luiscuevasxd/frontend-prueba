import { gql } from '@apollo/client';

export const GET_VEHICLE_OWNERS = gql`
  query getVehicleOwners($input: VehicleOwnerFilter) {
    getVehicleOwners(input: $input) {
      data {
        id
        name
        lastname
        age
        status
        createdAt
      }
      metaData {
        page
        perPage
        totalCount
      }
    }
  }
`;

export const CREATE_VEHICLE_OWNER = gql`
  mutation createVehicleOwner($input: VehicleOwnerRegister!) {
    createVehicleOwner(input: $input) {
      id
    }
  }
`;
