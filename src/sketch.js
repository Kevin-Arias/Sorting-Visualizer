let values = [];
let w = 10;
let states = [];
var valueLength;
let quickButton;
let selectionButton;
let insertionButton;
let mergeButton;
let resetButton;
let finished;
let processRunning;



function setup() {
  createCanvas(windowWidth,650);
  values = new Array(floor(width / w));
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  valueLength = values.length;
  finished = false;
  processRunning = false;



  quickButton = createButton('Quick Sort');
  quickButton.style('font-size', '25px');
  quickButton.style('background-color', color(235,235,235));
  selectionButton = createButton('Selection Sort');
  selectionButton.style('font-size', '25px');
  selectionButton.style('background-color', color(235,235,235));
  insertionButton = createButton('Insertion Sort');
  insertionButton.style('font-size', '25px');
  insertionButton.style('background-color', color(235,235,235));
  mergeButton = createButton('Merge Sort');
  mergeButton.style('font-size', '25px');
  mergeButton.style('background-color', color(235,235,235));
  resetButton = createButton('Reset');
  resetButton.style('font-size', '25px');
  resetButton.style('background-color', color(235,235,235));

  quickButton.position(50, 685);
  selectionButton.position(230, 685);
  insertionButton.position(450, 685);
  mergeButton.position(660, 685);
  resetButton.position(1000, 685);

  quickButton.mousePressed(quick_is_pressed);
  selectionButton.mousePressed(selection_is_pressed);
  insertionButton.mousePressed(insertion_is_pressed);
  mergeButton.mousePressed(merge_is_pressed);
  resetButton.mousePressed(reset_is_pressed);




}

function quick_is_pressed() {
  if (processRunning) {
    return;
  }
  processRunning = true;
  quickSort(values, 0, values.length - 1);
}
function selection_is_pressed() {
  if (processRunning) {
    return;
  }
  processRunning = true;
  selectionSort(values);
}
function insertion_is_pressed() {
  if (processRunning) {
    return;
  }
  processRunning = true;
  insertionSort(values);
}
function merge_is_pressed() {
  if (processRunning) {
    return;
  }
  processRunning = true;
  mergeSort(values);
}
function reset_is_pressed() {
  finished = true;
  values = new Array(floor(width / w));
  states = new Array(values.length);
  for (let i = 0; i < values.length; i++) {
    values[i] = random(height);
    states[i] = -1;
  }
  processRunning = false;

}



async function selectionSort(arr) {
  for (let x = 0; x < arr.length; x++) {
    states[x] = 1;
  }
  if (finished) {
    finished = false;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (finished) {
      reset_is_pressed();
      finished = false;
      processRunning = false;
      return;
    }
    let min = i;
    states[min] = 0;
    for (let j = i+1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    await swap(arr, min, i);
    states[min] = 1;
    states[i] = -1;

  }
  for (let i = 0; i < arr.length; i++) {
    states[i] = -1;
  }
  finished = false;
  processRunning = false;

}

async function insertionSort(arr) {

  for (let x = 0; x < arr.length; x++) {
    states[x] = 1;
  }
  //Check 1
  if (finished) {
    finished = false;
  }
  for (let i = 1; i < arr.length; i++) {
    //Check 2
    if (finished) {
      reset_is_pressed();
      finished = false;
      processRunning = false;
      return;
    }
    let key = arr[i];
    states[i+1] = 0;
    let j = i - 1;
    while( j >= 0 && arr[j] > key) {
      //Check 3
      if (finished) {
        reset_is_pressed();
        finished = false;
        processRunning = false;
        return;
      }
      states[j+1] = 2;
      await insertionSwap(arr, j+1, j);
      states[j+1] = -1;
      states[j] = 2;
      j--;
    }
    arr[j+1] = key;
    states[j+1] = -1;
    states[i] = -1;

  }
  for (let i = 0; i < arr.length; i++) {
    states[i] = -1;
  }
  finished = false;
  processRunning = false;

}

async function mergeSort(arr) {

  for (let x = 0; x < arr.length; x++) {
    states[x] = 1;
  }
  let low = 0;
  let high = arr.length - 1;
  let temp = arr.slice(0);

  if (finished) {
    finished = false;
  }
  for (let m = 1; m <= high - low; m = 2*m) {
    for (let x = 0; x < arr.length; x++) {
      states[x] = 1;
    }
    for (let i = low; i < high; i += 2*m) {
      if (finished) {
        reset_is_pressed();
        finished = false;
        processRunning = false;
        return;
      }
      let from = i;
      let mid = i+m-1;
      let to = Math.min(i+2*m-1, high);
      await merge(arr, temp, from, mid, to);
    }

  }
  for (let x = 0; x < arr.length; x++) {
    if (finished) {
      reset_is_pressed();
      finished = false;
      processRunning = false;
      return;
    }
    states[x] = 0;
    await sleep(1);
    states[x] = -1;
  }
  finished = false;
  processRunning = false;
}

async function merge(arr, temp, from, mid, to) {
  await sleep(25);
  let k = from;
  let i = from;
  let j = mid+1;


  while (i <= mid && j <= to) {
    if (arr[i] < arr[j]) {
      states[k] = 0;
      await sleep(10);
      temp[k++] = arr[i++];
      states[k-1] = -1;
      states[k] = 0;
    } else {
      states[k] = 0;
      await sleep(10);
      temp[k++] = arr[j++];
      states[k-1] = -1;
      states[k] = 0;
    }
    await sleep(10);
    states[k] = -1;
  }
  while (i <= mid) {
    temp[k++] = arr[i++];

  }

  for (i = from; i <= to; i++) {

    states[i] = -1;
    arr[i] = temp[i];

  }
}



async function quickSort(arr, start, end) {
  if (finished) {
    finished = false;
  }
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  if (finished) {
    reset_is_pressed();
    finished = false;
    processRunning = false;
    return;
  }
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
  finished = false;
  processRunning = false;

}

async function partition(arr, start, end) {
  if (finished) {
    return;
  }
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (finished) {
      return;
    }
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  if (finished) {
    return;
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if(i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(0);


  for (let i = 0; i < values.length; i++) {
    // noStroke();
    stroke(0);
    if (states[i] == 0) {
      //This is a pivotIndex
      fill('#E0777D');
    } else if (states[i] == 1) {
      fill('#D6FFB7');
    } else if (states[i] == 2) {
      fill('#FFFC7A');
    } else {
      //Nothing is happening to these values
      fill(255);
    }
    rect(i * w, height - values[i], w, values[i]);
  }






}

async function swap(arr, a, b) {
  await sleep(40);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

async function insertionSwap(arr,a,b) {
  await sleep(0.1);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
