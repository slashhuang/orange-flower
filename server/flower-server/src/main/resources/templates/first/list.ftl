<#-- @ftlvariable name="users" type="java.util.List<demo.api.user.User>" -->
<#list users as u>
    ${u.id} ${u.name} <br> ���2
</#list>
