const getQueryKeys = <T, F = unknown>(key: string) => {
  const all = [key] as const;
  const lists = [...all, 'list'] as const;
  const details = [...all, 'detail'] as const;

  return {
    all,
    lists,
    list: (variables: T) => [...lists, variables] as const,
    details,
    detail: (variables: F) => [...details, variables] as const,
  };
};

export const queryKey = {
  /** 공지사항 */
  notice: getQueryKeys<{ orderBy: { id: 'desc' } }, { id: number }>('notice'), // TODO 확인 후 대체할 것
};
