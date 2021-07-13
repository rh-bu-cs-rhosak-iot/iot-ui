import { gql, useQuery } from '@apollo/client';

export const countMeters = gql`
  query CountMeters {
    countMeters
  }
`;

export type CountMetersQueryResult = {
    countMeters: number
}

export function CountMetersQuery() {
  return useQuery<CountMetersQueryResult, any>(countMeters, {});
}
