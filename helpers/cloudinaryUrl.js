function cloudinaryUrl(path, width, height) {
  return `https://res.cloudinary.com/dd8jqb4rl/image/upload/f_auto,q_auto,w_${width},h_${height},c_fill/${path}`;
}