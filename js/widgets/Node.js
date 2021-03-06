// JavaScript File
/* global NodeText */

class Node {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.color = "";
        this.width = 1;
        this.height = 0;
        this.id = "";
        this.text = new NodeText();
        this.isUpdated = false;
        this.type = "rect";
        this.path = "";
        this.isDelete = false;
    }
    
    Update(n)
    {
        this.x = n.x;
        this.y = n.y;
        this.color = n.color;
        this.width = n.width;
        this.height = n.height;
        this.id = n.id;
        this.text.Update(n.text);
        this.isUpdated = n.isUpdated;
        this.type = n.type;
        this.path = n.d;
        this.isDelete = n.isDelete;
    }
}