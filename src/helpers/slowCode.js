export const slowCode = async (time) => {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, time);
    });
  };
  