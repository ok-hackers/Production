<# Written by: Jake Swick 
Purpose: Delete a VM
 #>
<# Remove-VM -name "Win10Test" -Confirm:$false #>
Remove-VM -VM 'Win10Test' -DeletePermanently -Confirm:$false
