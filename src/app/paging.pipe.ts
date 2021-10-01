// import { Pipe, PipeTransform } from "@angular/core";

// @Pipe({
//     name: 'paging',
//     pure:false
// })
// export class PagingPipe implements PipeTransform{
//     transform(array){
//         let page:number = localStorage.getItem("page")? +localStorage.getItem("page"):1;
//         console.log("pipe")
//         console.log(array.slice((page-1)*2 ,2));
//         return array.slice((page-1)*10 ,10);
//     }
// }