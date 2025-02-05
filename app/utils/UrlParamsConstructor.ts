/* eslint-disable */
/* eslint-disable no-restricted-syntax */
export const URLSearchParamsConstructor = (paramsObject: any) => {
    const params = new URLSearchParams();
    for (const key in paramsObject) {
      const value = paramsObject[key];
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          params.append(key, value.join(","));
        } else {
          params.append(key, value);
        }
      }
    }
    return params;
  };
  