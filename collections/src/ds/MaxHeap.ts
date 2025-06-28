/**
 *
 */
export interface MaxHeapInterface {
  /**
   * Insert a new key into heap
   * @param key key to insert
   * @return boolean to check whether key was added or not
   */
  insert(key: number): boolean;

  /**
   * Remove the highest priority key (maximum for max heap)
   * @return removed key. Exception if empty
   */
  removeMax(): void;
}

export class MaxHeap implements MaxHeapInterface {
  private static NODE = class {
    protected _key: number;
    constructor(k: number) {
      this._key = k;
    }

    get key(): number {
      return this._key;
    }
  };

  private heapArray: InstanceType<(typeof MaxHeap)["NODE"]>[] = [];
  private currentSize: number;

  constructor(capacity: number) {
    this.heapArray = new Array(capacity);
    this.currentSize = 0;
  }

  public insert(key: number): boolean {
    if (this.currentSize == this.heapArray.length) {
      return false;
    }

    // add node to array
    this.heapArray[this.currentSize] = new MaxHeap.NODE(key);
    // swap node with its parents (if necessary) until the tree is
    // restored to be a heap (percolate up)
    this.percolateUp(this.currentSize);
    this.currentSize++;
    return true;
  }

  public removeMax(): number {
    if (this.currentSize == 0) {
      return Infinity;
    }

    // get max element
    const root: InstanceType<(typeof MaxHeap)["NODE"]> = this.heapArray[0];
    this.currentSize--;
    // last node becomes root
    this.heapArray[0] = this.heapArray[this.currentSize];
    this.heapArray[this.currentSize] = null!;
    // percolate down
    this.percolateDown(0);
    return root.key;
  }

  private percolateUp(index: number): void {
    // save the bottom node (newly added node)
    const bottom: InstanceType<(typeof MaxHeap)["NODE"]> =
      this.heapArray[index];

    // find the initial index value parent of the newly added node:
    // NOTE:
    // (i - 1) / 2	Parent index
    // 2 * i + 1	Left child
    // 2 * i + 2	Right child
    let parent = Math.floor((index - 1) / 2);

    // while parent's key is smaller than the new key/ child key
    while (index > 0 && this.heapArray[parent].key < bottom.key) {
      // parent node comes down
      this.heapArray[index] = this.heapArray[parent];
      // index moves up
      index = parent;
      // new parent index
      parent = Math.floor((index - 1) / 2);
    }

    // finally, insert newly added node into proper position
    this.heapArray[index] = bottom;
  }

  private percolateDown(index: number): void {
    // get 0 index value
    const top: InstanceType<(typeof MaxHeap)["NODE"]> = this.heapArray[index];
    // larger child's index
    let largerChild: number;
    // while there is atleast left child
    while (2 * index + 1 < this.currentSize) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;

      // find which one is larger child
      if (
        rightChild < this.currentSize &&
        this.heapArray[leftChild].key < this.heapArray[rightChild].key
      ) {
        largerChild = rightChild;
      } else {
        largerChild = leftChild;
      }

      // no need to go down anymore
      if (this.heapArray[largerChild].key < top.key) {
        break;
      }

      // move the node up
      this.heapArray[index] = this.heapArray[largerChild];
      // index goes down toward larger child
      index = largerChild;

      // put top key into proper location to restore the heap
      this.heapArray[index] = top;
    }
  }
}
