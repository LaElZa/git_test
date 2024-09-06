//XJS=libComm.xjs
(function()
{
    return function(path)
    {
        var obj;
    
        // User Script
        this.registerScript(path, function() {
        this.gfnSetUndefinedByValue = function(sValue, sDefValue)
        {
        	if (sValue === undefined)
        	{
        		return sDefValue;
        	}
        	else
        	{
        		return sValue;
        	}
        };

        this.gfnExportCSV = function(sFileName, objGrid)
        {
        	var objFileDlg;

        	if (!this.FileDlg)
        	{
        		objFileDlg = new FileDialog("FileDlg", this);
        		objFileDlg.addEventHandler("onclose", this.FileDlg_onclose, this);
                this.addChild(objFileDlg.name, objFileDlg);
        	}

        	this.FileDlg.targetGrid = objGrid;
        	this.FileDlg.open("Save", FileDialog.SAVE, "%MYDOCUMENT%", sFileName);
        }

        this.FileDlg_onclose = function(obj,e)
        {
        	if (e.reason == 2)
        	{
        		var objVFile;
        		var objGrid = obj.targetGrid;
        		var bOpen;
        		var bChangeFileSecureLevel = false;
        		var sFileSequreLevel = nexacro.getEnvironment().filesecurelevel;
        		var sCSV;

        		if (sFileSequreLevel != "all")
        		{
        			nexacro.getEnvironment().set_filesecurelevel("all");
        			bChangeFileSecureLevel = true;
        		}

        		// get selected file object
        		objVFile = e.virtualfiles[0];

        		objVFile.set_async(false);

        		// open virtual files
        		bOpen = objVFile.open(null, VirtualFile.openWrite);

        		try
        		{
        			sCSV = this.gfnMakeCSVFromGrid(objGrid);

        			// write virtual files
        			objVFile.write(sCSV, "UTF-8");

        		}
        		catch(e)
        		{
        			// close virtual files
        			objVFile.close();
        			alert("export error");
        		}

        		// close virtual files
        		objVFile.close();

        		obj.targetGrid = null;

        		if (bChangeFileSecureLevel)
        		{
        			nexacro.getEnvironment().set_filesecurelevel(sFileSequreLevel);
        		}

        		alert("export successful");
        	}
        };

        this.gfnMakeCSVFromGrid = function(objGrid) // grid to string
        {
        	var sRet = "";
        	var sColSeperator = ","; // column seperator
        	var sRowSeperator = "\r\n"; // row seperator

        	var nColCnt = objGrid.getCellCount("head");
        	var nRowCnt = objGrid.getBindDataset().getRowCount();

        	// make column information
        	var sColumnId;
        	for (var i = 0; i < nColCnt; i++)
        	{
        		sColumnId = this.gfnSetUndefinedByValue(objGrid.getCellText(-1, i), "");

         		if (i == 0) sRet += sColumnId;
         		else sRet += sColSeperator + sColumnId;
        	}
        	sRet += sRowSeperator;

        	// make data information
        	for(var i = 0; i < nRowCnt; i++)
        	{
        		for(var j = 0; j < nColCnt; j++)
        		{
        			if (j == 0) sRet += '"' + this.gfnSetUndefinedByValue(objGrid.getCellText(i, j), "") + '"';
        			else sRet += sColSeperator + '"' + this.gfnSetUndefinedByValue(objGrid.getCellText(i, j), "") + '"';
        		}
        		sRet += sRowSeperator;
        	}

        	return sRet;
        }

        this.gfnExportExcel = function(sFileName, objGrid)
        {
        	if (!this.objExcelExport)
        	{
        		this.objExcelExport = new ExcelExportObject();
        		this.objExcelExport.addEventHandler("onsuccess", this.ExcelExportObject00_onsuccess, this);
        		this.objExcelExport.addEventHandler("onerror", this.ExcelExportObject00_onerror, this);
        		this.objExcelExport.set_exportmessageprocess("%d [ %d / %d ]");
        		this.objExcelExport.set_exportuitype("exportprogress");
        		this.objExcelExport.set_exporteventtype("itemrecord");
        		this.objExcelExport.set_exporttype(nexacro.ExportTypes.EXCEL2007);
        	}
        	else
        	{
        		this.objExcelExport.clear();
        	}

        	var sRet = this.objExcelExport.addExportItem(nexacro.ExportItemTypes.GRID, objGrid, "Sheet1!B2", null, null, null, "allstyle", "image");

        	this.objExcelExport.set_exportfilename(sFileName);

        	var nLeft = this.getOffsetWidth()/2 - 150;
        	var nTop = this.getOffsetHeight()/2 - 75;

        	var objParentFrame = this.getOwnerFrame();
        	var objFrame = new ChildFrame("commSelectXeniPath", nLeft, nTop, 300, 150, null, null, "Comm::commSelectXeniPath.xfdl");

        	objFrame.showModal(objParentFrame, "", this, this.gfnExportExcelCallback);
        }

        this.gfnExportExcelCallback = function(sId, sXeniPath)
        {
        	if (sXeniPath)
        	{
        		this.objExcelExport.set_exporturl(sXeniPath);
        		this.objExcelExport.exportData();
        	}
        }

        this.gfnFindValue = function(arrData, sTargetId, sTargetValue, sRtnId)
        {
        	for(var i = 0; i < arrData.length; i++)
        	{
        		if (arrData[i][sTargetId] == sTargetValue)
        		{
        			return arrData[i][sRtnId];
        		}
        	}

        	return "";
        }
        });
    
        this.loadIncludeScript(path);
        
        obj = null;
    };
}
)();
