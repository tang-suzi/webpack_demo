import count from "./js/count";
import sum from "./js/sum";
import "./css/index.css";
import "./less/index.less";
import "./scss/index.scss";
import "./scss/index.sass";
import "./stylus/index.styl";

console.log(count(2, 3));
console.log(sum(1, 2, 3));

if(module.hot){
    module.hot.accept("./js/count", function(){
        console.log("count module is updated");
    })
    module.hot.accept("./js/sum", function(){
        console.log("sum module is updated");
    })
}