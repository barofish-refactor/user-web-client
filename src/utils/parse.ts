import type { UserState } from 'src/api/gql/graphql';

function parseGenerator<T extends string>(obj: { [_ in T]: string }, fallback = '-') {
  return (v: Nullish<T>) => (v ? obj[v] : fallback);
}

const userStateToString: { [_ in UserState]: string } = {
  ACTIVE: 'a',
  BANNED: 'b',
  DELETED: 'c',
};
export const parseUserState = parseGenerator(userStateToString);
