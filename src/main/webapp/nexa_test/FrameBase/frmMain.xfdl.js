(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("External_Form");
            this.set_titletext("Tutorial Form");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new FileDialog("FileDialog00", this);
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Tab("tabWork","10","10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_tabindex("4");
            this.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage1",this.tabWork);
            obj.set_text("All");
            obj.set_url("Work::workAll.xfdl");
            this.tabWork.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage2",this.tabWork);
            obj.set_text("General");
            obj.set_url("Work::workGeneral.xfdl");
            this.tabWork.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage3",this.tabWork);
            obj.set_text("Frames");
            obj.set_url("Work::workFrames.xfdl");
            this.tabWork.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage4",this.tabWork);
            obj.set_text("Forms");
            obj.set_url("Work::workForms.xfdl");
            this.tabWork.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage5",this.tabWork);
            obj.set_text("Components");
            obj.set_url("Work::workComponents.xfdl");
            this.tabWork.addChild(obj.name, obj);

            obj = new Tabpage("Tabpage6",this.tabWork);
            obj.set_text("Form Print");
            obj.set_url("Work::workFormPrint.xfdl");
            this.tabWork.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","Desktop_screen",800,600,this,function(p){});
            obj.set_mobileorientation("landscape");
            obj.set_stepcount("0");
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("fdl","Work::workAll.xfdl");
            this._addPreloadList("fdl","Work::workGeneral.xfdl");
            this._addPreloadList("fdl","Work::workFrames.xfdl");
            this._addPreloadList("fdl","Work::workForms.xfdl");
            this._addPreloadList("fdl","Work::workComponents.xfdl");
            this._addPreloadList("fdl","Work::workFormPrint.xfdl");
        };
        
        // User Script
        this.registerScript("frmMain.xfdl", function() {

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.FileDialog00.addEventHandler("onclose",this.FileDialog00_onclose,this);
        };
        this.loadIncludeScript("frmMain.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
