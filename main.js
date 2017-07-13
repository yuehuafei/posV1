'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释
var allItems=[
  {
    barcode: 'ITEM000000',
    name: '可口可乐',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000001',
    name: '雪碧',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000002',
    name: '苹果',
    unit: '斤',
    price: 5.50
  },
  {
    barcode: 'ITEM000003',
    name: '荔枝',
    unit: '斤',
    price: 15.00
  },
  {
    barcode: 'ITEM000004',
    name: '电池',
    unit: '个',
    price: 2.00
  },
  {
    barcode: 'ITEM000005',
    name: '方便面',
    unit: '袋',
    price: 4.50
  }
];
//loadAllItems();
var promotions={
  type: 'BUY_TWO_GET_ONE_FREE',
  barcodes: [
    'ITEM000000',
    'ITEM000001',
    'ITEM000005'
  ]
};//loadPromotions();
//1.切割输入初始化
function tagsSplit(tags) {
  var output=[];
  for(var i=0;i<tags.length;i++)
  {
    var strs=tags[i].split("-");
    var obj=new Object();
    obj.barcode=strs[0];
        if(strs[1]==null)
        {
    
          obj.count=1;
        }
        else
          obj.count=parseFloat(strs[1]);

        output.push(obj);
      }
  return output;
}
//2.合并
function merge(output) {
  for(var i=0;i<output.length;i++)
  {
    for(var j=i+1;j<output.length;)
    {
      if(output[i].barcode==output[j].barcode)
      {
        output[i].count+=output[j].count;
        output.splice(j,1);
      }
      else j++;
    }
  }
  return output;
}
//3.补全信息
function fillInfo(output,allItems) {

  for(var i=0;i<output.length;i++)
  {
    for(var j=0;j<allItems.length;j++)
    {
      if(output[i].barcode==allItems[j].barcode)
      {
        output[i].name=allItems[j].name;
        output[i].unit=allItems[j].unit;
        output[i].price=allItems[j].price;
      }
    }
  }
  return output;
}
//4.计算小计
function sub(output,promotions) {
  var subTotal=[];
  var flag;   //
  for(var i=0;i<output.length;i++)
  {
    flag=1;  //重新初始化
    for(var j=0;j<promotions.barcodes.length;j++)
    {
      if(output[i].barcode==promotions.barcodes[j]&&output[i].count>=2)
      {
        subTotal[i]=(output[i].count-1)*output[i].price
        flag=0;
        break;
      }
    }
    if(flag==1)
    subTotal[i]=output[i].count*output[i].price;
  }
  return subTotal;
}
//5.计算总计
function sum(subTotal) {
  var totalMoney=0;
  for(var i=0;i<subTotal.length;i++)
  {
    totalMoney+=subTotal[i];
  }
  return totalMoney;
}
//6计算优惠
function promotion(totalMoney,output) {
  var sum=0;
  for(var i=0;i<output.length;i++)
  {
    sum+=(output[i].price*output[i].count);
  }
  var privilege=sum-totalMoney;
  return privilege;

}

//7.字符串拼接
function strConnect(output,subTotal,totalMoney,privilege){
  var strs="***<没钱赚商店>收据***\n";
  for(var i=0;i<output.length;i++){
    strs+="名称："+output[i].name+"，数量："+output[i].count+output[i].unit+"，单价："+output[i].price.toFixed(2)
      +"(元)，小计："+subTotal[i].toFixed(2)+"(元)\n";
  }
  strs+="----------------------\n"+"总计："+totalMoney.toFixed(2)+"(元)\n"+"节省："+privilege.toFixed(2)+"(元)\n**********************";
  return strs;
}
//8.打印
function printReceipt(tags){
  var output=fillInfo(merge(tagsSplit(tags)),allItems);
  var subTotal=sub(output,promotions);
  var totalMoney=sum(subTotal);
  var privilege=promotion(totalMoney,output);
  var strs=strConnect(output,subTotal,totalMoney,privilege);
  console.log(strs);
 // console.log(subTotal);
}

const tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];

printReceipt(tags);

