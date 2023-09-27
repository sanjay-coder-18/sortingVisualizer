
const n=10;
const array=[];

init();

function init(){
    for (let i=0;i<n;i++){
        array[i]=Math.random();
    }

    showBars();
}
function playMergeSort() {
    const copy = [...array];
    const swaps = mergeSort(copy, 0, copy.length - 1);
    animate(swaps);
}
function playBubbleSort(){
    const copy=[...array];
   const swaps= bubbleSort(copy);
    animate( swaps);
}
function playSelectionSort(){
    const copy=[...array];
   const swaps= selectionSort(copy);
    animate( swaps);
}

function playInsertionSort(){
    const copy=[...array];
   const swaps= insertionSort(copy);
    animate( swaps);
}

function animate(swaps){
    if(swaps.length==0){
        showBars();
        return;
    }
    const [i,j]=swaps.shift();
    [array[i],array[j]]=[array[j],array[i]];
    showBars([i,j]);
    setTimeout(function(){
        animate(swaps)
    },1000);
    
}

function insertionSort(array){
    const swaps=[];
    for(let i=1;i<array.length;i++){
        let temp=array[i];
        let j=i-1;
        for(;j>=0;j--){
            if(array[j]>temp){
                array[j+1]=array[j];
                swaps.push([j+1,j])
            }
            else{
                break;
            }
        }
        array[j+1]=temp;
    }
    return swaps;
}

function selectionSort(array){
    const swaps=[];
    for(let i=0;i<array.length;i++){
        let minIndex=i;
        for(let j=i+1;j<array.length;j++){
            if(array[minIndex]>array[j]){
                minIndex=j;
            }
        }
        swaps.push([i,minIndex]);
        let temp=array[i];
        array[i]=array[minIndex];
        array[minIndex]=temp;
        
    }
    return swaps;

}


function bubbleSort(array){
    const swaps=[];

    for(let i=0;i<array.length;i++){
        for(let j=0;j<array.length -1 - i;j++){
            if(array[j]>array[j+1]){
                swaps.push([j,j+1]);
                [array[j],array[j+1]]=[array[j+1],array[j]];
            }
        }
    }
    return swaps;

}


function mergeArrays(array, s, mid, e) {
    let len1 = mid - s + 1;
    let len2 = e - mid;

    let arr1 = new Array(len1);
    let arr2 = new Array(len2);

    for (let i = 0; i < len1; i++) {
        arr1[i] = array[s + i];
    }

    for (let i = 0; i < len2; i++) {
        arr2[i] = array[mid + 1 + i];
    }

    let i = 0;
    let j = 0;
    let k = s;
    let swaps = [];

    while (i < len1 && j < len2) {
        if (arr1[i] <= arr2[j]) {
            array[k++] = arr1[i++];
        } else {
            array[k++] = arr2[j++];
            swaps.push([k - 1, s + i]);
        }
    }

    while (i < len1) {
        array[k++] = arr1[i++];
    }

    while (j < len2) {
        array[k++] = arr2[j++];
    }

    return swaps;
}


function mergeSort(array, s, e) {
    let swaps = [];
    
    if (s < e) {
        let mid = Math.floor((s + e) / 2);
        let leftSwaps = mergeSort(array, s, mid);
        let rightSwaps = mergeSort(array, mid + 1, e);
        swaps = leftSwaps.concat(rightSwaps);
        swaps = swaps.concat(mergeArrays(array, s, mid, e));
    }

    return swaps;
}




function showBars(indices){
    container.innerHTML=""

    for(let i=0;i<array.length;i++){

        const bar=document.createElement("div");
        bar.style.height=array[i]*100+"%";
        
        bar.classList.add("bar");
        if(indices && indices.includes(i)){
            bar.style.backgroundColor="red";
        }
        container.appendChild(bar);
      
    }

}

