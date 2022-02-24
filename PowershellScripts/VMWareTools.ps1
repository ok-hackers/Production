# Written by Jake Swick
#
# This script gets VMWare installed and connects to the Server IP for Access 

Install-Module -name vmware.powercli -Scope CurrentUser #Installs VMWare
echo 'Install VMWare'

Set-ExecutionPolicy remotesigned -Confirm:$false -Scope CurrentUser #Executes the VM
echo 'Execute'

Set-PowerCLIConfiguration -InvalidCertificateAction Prompt -Confirm:$false #Passes the PowerCLI configuration
echo 'PassPowerCLI'

Connect-VIServer -Server 10.25.1.4 -user root -Password Rajah424! #Connects to the 10.25.1.4 server. This is where the VM's will be located
echo 'Connection Success!'

Get-VM -Name Win10Test #Names the VM
echo 'VM Setup!'