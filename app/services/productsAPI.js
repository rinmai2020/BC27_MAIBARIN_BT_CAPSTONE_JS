var baseUrl = "https://62a42428259aba8e10e2f93f.mockapi.io/api/capstone";

// Hàm call API lấy danh sách sản phẩm
function apiGetProduct(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    // params: {
    //   name: search,
    // },
  });
}

// Hàm call API thêm sản phẩm
function apiAddProduct(product) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: product,
  });
}

// Hàm call API xoá sản phẩm
function apiDeleteProduct(productId) {
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "DELETE",
  });
}

// hàm call  API lấy chi tiết người dùng
function apiGetProductDetail(productId) {
  return axios({
    url: `${baseUrl}/${productId}`,
    method: "GET",
  });
}

// hàm call API cập nhật người dùng đã chỉnh sửa
function apiUpdateProduct(product) {
  return axios({
    url: `${baseUrl}/${product.id}`,
    data: product,
    method: "PUT",
  });
}
