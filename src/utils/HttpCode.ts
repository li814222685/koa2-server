// utils/HttpCode.js
export const HttpCode = {
  Success: {
    success_ok: 2000,
    success_ok_msg: "请求成功",
    success_created: 2001,
    success_created_msg: "请求已创建",
    success_accepted: 2002,
    success_accepted_msg: "请求已受理",
  },
  Redirect: {
    redirect_moved_permanently: 3001,
    redirect_moved_permanently_msg: "请求资源已被永久移动到新位置",
    redirect_moved_temporarily: 3002,
    redirect_moved_temporarily_msg: "请求资源临时从其它url相应请求",
    redirect_not_modified: 3004,
    redirect_not_modified_msg: "资源未更改，直接从协商缓存中获取",
  },
  RequestError: {
    request_error_bad_request: 4000,
    request_error_bad_request_msg: "无效的请求",
    request_error_unauthorized: 4001,
    request_error_unauthorized_msg: "请求未授权，检查请求头部是否包含token信息",
    request_error_forbidden: 4003,
    request_error_forbidden_msg: "请求被拒绝，token无效或已过期",
    request_error_not_found: 4004,
    request_error_not_found_msg: "请求资源在服务器上不存在",
    request_error_method_not_allowed: 4005,
    request_error_method_not_allowed_msg: "请求方式不被允许",
  },
  ServerError: {
    server_error_internal_error: 5000,
    server_error_internal_error_msg: "服务器内部错误",
    server_error_not_imp: 5001,
    server_error_not_imp_msg: "服务器不支持当前请求",
    server_error_bad_gateway: 5002,
    server_error_bad_gateway_msg: "无效的网关",
  },
};
