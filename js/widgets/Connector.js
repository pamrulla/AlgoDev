// JavaScript File
class Connector
{
    constructor()
    {
        this.x1 = 0;
        this.y1 = 0;
        this.x2 = 0;
        this.y2 = 0;
        this.color = "black";
        this.width = 2;
        this.id = "";
        this.isUpdated = false;
        this.type = "connector";
        this.isDelete = false;
    }
    
    Update(n)
    {
        this.x1 = n.x1;
        this.y1 = n.y1;
        this.x2 = n.x2;
        this.y2 = n.y2;
        this.color = n.color;
        this.width = n.width;
        this.id = n.id;
        this.isUpdated = n.isUpdated;
        this.type = n.type;
        this.isDelete = n.isDelete;
    }
}