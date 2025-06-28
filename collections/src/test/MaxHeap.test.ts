import { MaxHeap } from "../ds/MaxHeap";

describe("MaxHeap", () => {
  it("inserts elements and maintains heap property", () => {
    const heap = new MaxHeap(10);
    expect(heap.insert(26)).toBe(true);
    expect(heap.insert(32)).toBe(true);
    expect(heap.insert(45)).toBe(true);
    expect(heap.insert(10)).toBe(true);
    expect(heap.insert(29)).toBe(true);
    expect(heap.insert(8)).toBe(true);
    expect(heap.insert(11)).toBe(true);
    expect(heap.insert(9)).toBe(true);
    expect(heap.insert(73)).toBe(true);
    expect(heap.insert(15)).toBe(true);

    expect(heap.removeMax()).toBe(73);
    expect(heap.removeMax()).toBe(45);
  });

  it("returns false when heap is full", () => {
    const heap = new MaxHeap(1);
    expect(heap.insert(99)).toBe(true);
    expect(heap.insert(100)).toBe(false);
  });
});
