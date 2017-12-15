// JavaScript File
class NodeText {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = "";
        this.font = "";
        this.size = 1;
        this.value = 0;
        this.id = "";
    }
    
    Update(n)
    {
        this.x = n.x;
        this.y = n.y;
        this.color = n.color;
        this.font = n.font;
        this.size = n.size;
        this.value = n.value;
        this.id = n.id;
    }
}