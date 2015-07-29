<#-- @ftlvariable name="users" type="java.util.List<com.orange.flower.api.user.User>" -->
<#list users as u>
    ${u.id} ${u.name} <br>
</#list>
