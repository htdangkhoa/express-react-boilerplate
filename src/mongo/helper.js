/* @flow */
import { type MongoPagingType, type MongoPagingResultType } from 'types';

export const usePaging = async ({
  collection,
  query = {},
  options = {},
  skip = 0,
  limit = 10,
}: MongoPagingType): MongoPagingResultType => {
  const roundSkip = Math.abs(Math.floor(skip));

  const roundLimit = Math.abs(Math.floor(limit));

  const realSkip = roundSkip * roundLimit;

  const transaction = collection
    .find(query, options)
    .skip(realSkip)
    .limit(roundLimit);

  const count = await transaction.count();

  const total = Math.ceil(count / roundLimit);

  const metaData = {
    index: roundSkip,
    total,
  };

  const values = await transaction.toArray();

  return {
    values,
    metaData,
  };
};
