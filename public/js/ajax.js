/*
 * @Author: GM
 * @Date: 2017-03-27 15:00:00
 * @Last Modified by: GM
 * @Last Modified time: 2017-03-27 15:10:09
 */
let $ = require('webpack-zepto')
let re = new RegExp('[a-zA-z]+://[^\s]*')

export default {
  get (url, data, successFun, errorFun) {
    $.ajax({
      url: re.test(url) ? url : URL + url,
      data: data,
      type: 'get',
      dataType: 'json',
      timeout: 20000,
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        if (successFun) successFun.call(this, data)
      },
      error: function (err) {
        if (errorFun) errorFun.call(this, err)
      }
    })
  },
  post (url, data, successFun, errorFun) {
    $.ajax({
      url: re.test(url) ? url : URL + url,
      type: 'post',
      data: data,
      dataType: 'json',
      timeout: 20000,
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        if (successFun) successFun.call(this, data)
      },
      error: function (err) {
        if (errorFun) errorFun.call(this, err)
      }
    })
  },
  // jsonp get请求
  getJsonp (url, data, successFun, errorFun) {
    $.ajax({
      url: re.test(url) ? url : URL + url,
      data: data,
      type: 'get',
      dataType: 'jsonp',
      jsonp: 'callback',
      jsonpCallback: 'success_jsonpCallback',
      timeout: 20000,
      xhrFields: {
        withCredentials: true
      },
      success: function (data) {
        if (successFun) successFun.call(this, data)
      },
      error: function (err) {
        if (errorFun) errorFun.call(this, err)
      }
    })
  },
  upload: function (url, file, successFun, errorFun) {
    var form = document.createElement('form')
    form.action = url
    form.method = 'post'
    form.enctype = 'multipart/form-data'
    var elInput = document.createElement('input')
    elInput.type = 'hidden'
    elInput.name = 'rootPath'
    elInput.value = 'member'
    form.appendChild(elInput)
    form.appendChild(file.cloneNode(true))
    var formdata = new FormData(form)

    $.ajax({
      url: url,
      data: formdata,
      type: 'post',
      cache: false,
      contentType: false,
      processData: false,
      success: function (data) {
        if (successFun) successFun.call(this, data)
      },
      error: function (err) {
        if (errorFun) errorFun.call(this, err)
      }
    })
  }
}
