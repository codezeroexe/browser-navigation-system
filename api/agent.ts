export class BrowserAgent {
  private back: string[] = [];
  private fwd: string[] = [];
  private curr: string | null = null;
  private readonly CAP = 50;

  visit(url: string): void {
    if (this.curr) {
      this.back.push(this.curr);
      if (this.back.length > this.CAP) this.back.shift();
    }
    this.curr = url;
    this.fwd = [];
  }

  goBack(): { success: boolean; error?: string } {
    if (this.back.length === 0) return { success: false, error: "No back history" };
    if (this.curr) {
      this.fwd.push(this.curr);
    }
    this.curr = this.back.pop()!;
    return { success: true };
  }

  goForward(): { success: boolean; error?: string } {
    if (this.fwd.length === 0) return { success: false, error: "No forward history" };
    if (this.curr) {
      this.back.push(this.curr);
      if (this.back.length > this.CAP) this.back.shift();
    }
    this.curr = this.fwd.pop()!;
    return { success: true };
  }

  reset(): void {
    this.back = [];
    this.fwd = [];
    this.curr = null;
  }

  getState() {
    return {
      curr: this.curr,
      back: [...this.back],
      fwd: [...this.fwd],
    };
  }
}
