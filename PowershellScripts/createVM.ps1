New-VM -Name 'TestVM' –VMHost 'VMHost-1' -Datastore 'MyDatastore' -DiskGB 40 -MemoryGB 2 -NumCpu 1 -NetworkName 'Virtual Machine Network' <# (networkname) I think this can be removed #>

<# https://developer.vmware.com/docs/powercli/latest/vmware.vimautomation.core/commands/new-vm/#DefaultParameterSet #>
