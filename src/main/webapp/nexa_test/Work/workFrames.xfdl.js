(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("workFrames");
            this.set_titletext("Frames Information");
            if (Form == this.constructor)
            {
                this._setFormPosition(800,600);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("dsFrames", this);
            obj._setContents("<ColumnInfo><Column id=\"id\" type=\"STRING\" size=\"256\"/><Column id=\"caption\" type=\"STRING\" size=\"256\"/><Column id=\"level\" type=\"STRING\" size=\"256\"/><Column id=\"status\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Button("btnSearch",null,"10","75","25","220",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("Search");
            obj.set_cssclass("btn_WF_search01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportCSV",null,"10","95","25","120",null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("Export CSV");
            obj.set_cssclass("btn_WF_save01");
            this.addChild(obj.name, obj);

            obj = new Button("btnExportExcel",null,"10","105","25","10",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("Export Excel");
            obj.set_cssclass("btn_WF_excel01");
            this.addChild(obj.name, obj);

            obj = new Grid("grdFrames","10","btnSearch:10",null,null,"10","10",null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_binddataset("dsFrames");
            obj.set_autofittype("col");
            obj.set_treeusecheckbox("false");
            obj.set_cellsizingtype("col");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"300\"/></Columns><Rows><Row size=\"24\" band=\"head\"/><Row size=\"24\"/></Rows><Band id=\"head\"><Cell text=\"frames\"/></Band><Band id=\"body\"><Cell text=\"bind:caption\" displaytype=\"treeitemcontrol\" edittype=\"tree\" treelevel=\"bind:level\" treestate=\"bind:status\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);

            obj = new Static("stTitle","10","5",null,"35","btnSearch:10",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("Frames Information");
            obj.set_cssclass("sta_WF_title01");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",800,600,this,function(p){});
            this.addLayout(obj.name, obj);
            
            // BindItem Information

            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.addIncludeScript("workFrames.xfdl","Lib::libComm.xjs");
        this.registerScript("workFrames.xfdl", function() {
        this.executeIncludeScript("Lib::libComm.xjs"); /*include "Lib::libComm.xjs"*/;

        /*******************************************************************************************************************************
        	 nexacrostudio.request

        	 syntax 		: nexacrostudio.request( requestType, dataobjectID = null);
        	 description	: request the project information being developed in nexacrostudio
        					  and receive it as the data property value of Dataobject.
        	 return 		: Information requested according to requestType is returned in the form of Json format string.
        	 ___________________________________________________________________________________________________________________________
        	 requestType	:
        		1) requesttype.all									11) requesttype.services
        		2) requesttype.general								12) requesttype.protocoladaptors
        		3) requesttype.environment							13) requesttype.deviceadaptors
        		4) requesttype.screeninfo							14) requesttype.applicationvariables
        		5) requesttype.env_variables						15) requesttype.app_datasets
        		6) requesttype.env_cookies							16) requesttype.app_variables
        		7) requesttype.env_httpheader						17) requesttype.app_dataobjects
        		8) requesttype.typedefinition						19) requesttype.applications
        		9) requesttype.modules								20) requesttype.forms
        		10) requesttype.objects

        	 dataobjectID : Set the ID of the DataObject to which the requested information will be reflected according to requestType.

        ********************************************************************************************************************************/

        this.btnSearch_onclick = function(obj,e)
        {
        	// request applications information of nexacrostudio project
        	var sRtn = nexacrostudio.request(requesttype.applications);

        	var objJSON = JSON.parse(sRtn);

        	this.fnMakeFramesData(objJSON);
        };

        this.fnMakeFramesData = function(objJSON)
        {
        	var arrApps = objJSON.applications;
        	var objApplication;

        	var arrFrames;
        	var objFrame;

        	var arrProperties;
        	var objProperty;

        	var nRow;
        	var arrFrameId;
        	var sId;
        	var sCaption;

        	this.dsFrames.clearData();
        	this.dsFrames.set_enableevent(false);

        	for (var i = 0; i < arrApps.length; i++)
        	{
        		objApplication = arrApps[i];

        		nRow = this.dsFrames.addRow();
        		this.dsFrames.setColumn(nRow, "id", objApplication.id);
        		this.dsFrames.setColumn(nRow, "caption", objApplication.id);
        		this.dsFrames.setColumn(nRow, "level", 0);
        		this.dsFrames.setColumn(nRow, "status", 1);

        		arrProperties = objApplication.properties;
        		for (var k = 0; k < arrProperties.length; k++)
        		{
        			objProperty = arrProperties[k];
        			nRow = this.dsFrames.addRow();
        			this.dsFrames.setColumn(nRow, "id", objApplication.id);
        			this.dsFrames.setColumn(nRow, "caption", objProperty.name + " : " + objProperty.value);
        			this.dsFrames.setColumn(nRow, "level", 1);
        		}

        		arrFrames = objApplication.frames;
        		for (var j = 0; j < arrFrames.length; j++)
        		{
        			objFrame = arrFrames[j];
        			arrFrameId = objFrame.id.split(".");
        			sId = arrFrameId[arrFrameId.length - 1];
        			sCaption = sId + "(" + objFrame.classname + ")";

        			nRow = this.dsFrames.addRow();
        			this.dsFrames.setColumn(nRow, "id", sId);
        			this.dsFrames.setColumn(nRow, "caption", sCaption);
        			this.dsFrames.setColumn(nRow, "level", arrFrameId.length);
        			this.dsFrames.setColumn(nRow, "status", 1);

        			arrProperties = objFrame.properties;
        			for (var k = 0; k < arrProperties.length; k++)
        			{
        				objProperty = arrProperties[k];
        				nRow = this.dsFrames.addRow();
        				this.dsFrames.setColumn(nRow, "id", sId);
        				this.dsFrames.setColumn(nRow, "caption", objProperty.name + " : " + objProperty.value);
        				this.dsFrames.setColumn(nRow, "level", arrFrameId.length+1);
        			}
        		}
        	}
        	this.dsFrames.set_enableevent(true);

        	if (this.dsFrames.getRowCount() > 0)
        	{
        		this.grdFrames.selectRow(0);
        	}
        }

        this.btnExportCSV_onclick = function(obj,e)
        {
        	this.gfnExportCSV("FramesInformation.csv", this.grdFrames);
        };

        this.btnExportExcel_onclick = function(obj,e)
        {
        	this.gfnExportExcel("FramesInformation", this.grdFrames);
        };

        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.btnSearch.addEventHandler("onclick",this.btnSearch_onclick,this);
            this.btnExportCSV.addEventHandler("onclick",this.btnExportCSV_onclick,this);
            this.btnExportExcel.addEventHandler("onclick",this.btnExportExcel_onclick,this);
        };
        this.loadIncludeScript("workFrames.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
