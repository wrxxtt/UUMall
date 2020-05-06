import Toast from "./Toast";

const plugin = {}

plugin.install = function(Vue)  {

  //1、创建组件构造器
  const toastContrustor=Vue.extend(Toast);
  //2、new方式，根据组件构造器，可以创造出一个组件对象
  const toast= new toastContrustor();
  //3、将组件对象，手动挂载到某个对象上
  toast.$mount(document.createElement('div'));
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast=toast;


}
export default plugin
