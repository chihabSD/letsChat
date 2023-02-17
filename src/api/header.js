export const getHeader = async i => {
  // const value = await AsyncStorage.getItem('lang');

  const header = {
    headers: {'user-agent': 'mobile', 'Accept-Language': 'ar'},
  };
  return header;
};
export const header = {
  headers: {'user-agent': 'mobile', 'Accept-Language': 'ar'},
};