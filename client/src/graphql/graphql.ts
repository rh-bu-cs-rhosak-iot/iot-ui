import { gql, QueryHookOptions, useQuery } from '@apollo/client';

export const countMeters = gql`
  query CountMeters {
    countMeters
  }
`;

export const findMeters = gql`
  query Meters(
    $filter: MeterFilter
    $page: PageRequest
    $orderBy: OrderByInput
  ) {
    meters(filter: $filter, page: $page, orderBy: $orderBy) {
      items {
        id
        address
        latitude
        longitude
      }
      offset
      limit
      count
    }
  }
`;

export const getMeter = gql`
  query GetMeter($id: ID!) {
    meter(id: $id) {
      id
      address
      latitude
      longitude
      status
      updated
    }
  }
`;

export type Maybe<T> = T | null;

export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };

export type StringInput = {
  ne?: Maybe<string>;
  eq?: Maybe<string>;
  le?: Maybe<string>;
  lt?: Maybe<string>;
  ge?: Maybe<string>;
  gt?: Maybe<string>;
  in?: Maybe<Array<string>>;
  contains?: Maybe<string>;
  startsWith?: Maybe<string>;
  endsWith?: Maybe<string>;
};

export type MeterFilter = {
  id?: Maybe<StringInput>;
  address?: Maybe<StringInput>;
  latitude?: Maybe<StringInput>;
  longitude?: Maybe<StringInput>;
  and?: Maybe<Array<MeterFilter>>;
  or?: Maybe<Array<MeterFilter>>;
  not?: Maybe<MeterFilter>;
};

export type PageRequest = {
  limit?: Maybe<number>;
  offset?: Maybe<number>;
};

export type OrderByInput = {
  field: string;
  order?: Maybe<SortDirectionEnum>;
};

export enum SortDirectionEnum {
  Desc = 'DESC',
  Asc = 'ASC'
}

export type CountMetersQueryResult = {
  countMeters: number;
};

export type FindMetersQueryVariables = Exact<{
  filter?: Maybe<MeterFilter>;
  page?: Maybe<PageRequest>;
  orderBy?: Maybe<OrderByInput>;
}>;

export type Meter = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
  status?: string;
  updated?: number;
};

export type MetersResultList = {
  items: Array<Maybe<Meter>>;
  offset?: Maybe<number>;
  limit?: Maybe<number>;
  count?: Maybe<number>;
};

export type MeterFields = Pick<
  Meter,
  'id' | 'address' | 'latitude' | 'longitude' | 'status' | 'updated'
>;

export type FindMetersQueryResult = {
  meters: Pick<MetersResultList, 'offset' | 'limit' | 'count'> & {
    items: Array<Maybe<MeterFields>>;
  };
};

export type GetMeterQueryVariables = Exact<{
  id: string;
}>;

export type GetMeterQueryResult = {
  meter: Maybe<MeterFields>;
};

export function CountMetersQuery() {
  return useQuery<CountMetersQueryResult, any>(countMeters, {});
}

export function FindMetersQuery(
  options: QueryHookOptions<FindMetersQueryResult, FindMetersQueryVariables>
) {
  return useQuery<FindMetersQueryResult, FindMetersQueryVariables>(
    findMeters,
    options
  );
}

export function GetMeterQuery(
  options: QueryHookOptions<GetMeterQueryResult, GetMeterQueryVariables>
) {
  return useQuery<GetMeterQueryResult, GetMeterQueryVariables>(
    getMeter,
    options
  );
}
