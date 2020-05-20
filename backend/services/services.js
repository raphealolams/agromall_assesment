const services = (options) => {
  const {
    got,
    to,
    googleKeys: { googleUrl, googleKey },
    cloudinary,
  } = options;

  const handleGeoCoding = async (payload) => {
    const url =
      payload.type == "latlong"
        ? `${googleUrl}?latlng=${payload.latLong}&key=${googleKey}`
        : `${googleUrl}?address=${payload.address}&key=${googleKey}`;

    const [error, response] = await to(
      got(url, {
        method: "GET",
        allowGetBody: true,
        responseType: "json",
      })
    );

    return {
      error: error || null,
      response: response.body,
    };
  };

  const handleUploadToCloud = (file) => {
    return new Promise((resolve, reject) => {
      return cloudinary.uploader
        .upload(file, { resource_type: "video" })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  };

  return Object.create({
    handleGeoCoding,
    handleUploadToCloud,
  });
};

module.exports = services;
