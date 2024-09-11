import { gql } from '@apollo/client';

export const GET_VEHICLES = gql`
  query getVehicles($input: VehicleFilter) {
    getVehicles(input: $input) {
      data {
        id
        brand
        model
        price
        status
        createdAt
        typeOperationVehicleId
        typeOperationVehicle {
          id
          code
        }
        vehicleOwnerId
        vehicleOwner {
          id
          name
        }
      }
      metaData {
        page
        perPage
        totalCount
      }
    }
  }
`;

export const CREATE_VEHICLE = gql`
  mutation createVehicle($input: VehicleRegister!) {
    createVehicle(input: $input) {
      id
    }
  }
`;

export const UPDATE_VEHICLE = gql`
  mutation updateVehicle($input: VehicleUpdate) {
    updateVehicle(input: $input)
  }
`;
export const CHANGE_STATUS_VEHICLE = gql`
  mutation changeStatusVehicle($vehicleId: ID!) {
    changeStatusVehicle(vehicleId: $vehicleId)
  }
`;
