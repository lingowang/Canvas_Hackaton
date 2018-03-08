<%@page contentType="application/json"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.sql.*, com.google.gson.*, java.text.SimpleDateFormat, org.apache.log4j.LogManager, org.apache.log4j.Logger, com.cubewise.rest.*"%>

<%!

private final Logger logger = LogManager.getLogger("sql.jsp");

%>


<% 
try {
  
    // Check is the person is logged in
    String instance = "dev";
    HttpProxySession httpProxySession = HttpProxySession.getSession(request);
    if(httpProxySession.getUserSessions().get(instance) == null){
        response.setStatus(401);
        out.println(JsonResult.error(401, "No session for instance: " + instance).toJson());
        return;
    }
    
    // Get the query parameters
    String department = request.getParameter("department");
    int skip = Integer.parseInt(request.getParameter("skip"));
    int limit = Integer.parseInt(request.getParameter("max"));
    
    // Load ODBC driver
    Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
    
    // Open connect to DSN canvas_sample
    try(Connection conn=DriverManager.getConnection("jdbc:odbc:canvas_sample","","");){
      
    	  // Create query
      	try(PreparedStatement query = conn.prepareStatement("SELECT * FROM FactFinance WHERE DepartmentGroupKey = ? LIMIT ? OFFSET ?");){
            
      	    // Set query parameters
            query.setString(1, department);
            query.setInt(2, limit);
            query.setInt(3, skip);
            
            // Execute query
            try(ResultSet result = query.executeQuery();){
            	  // Convert result to JSON and write to output stream
                out.write(Helper.convertToJson(result));
            }
        }
        
     }
}
catch(Exception ex)
{
    out.println(ex.toString());
    logger.error("Unable to execute query", ex);
}

%>